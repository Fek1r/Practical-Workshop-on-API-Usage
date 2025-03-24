using System.IO;
using System.Net;
using System.Text;
using System.Text.Json;
using Anatolij.Models;
using Anatolij.Data;

namespace Anatolij.Http;

public static class HttpHandler
{
    public static void HandleRequest(HttpListenerRequest request, HttpListenerResponse response)
    {
        response.ContentType = "application/json"; // Указываем, что ответ в JSON-формате

        if (request.HttpMethod == "GET" && request.Url.AbsolutePath == "/")
        {
            SendResponse(response, 200, "\"Hello User!\"");
        }
        if (request.HttpMethod == "GET" && request.Url.AbsolutePath == "/users")
        {
            HandleGetUsers(response);
        }
        else if (request.HttpMethod == "POST" && request.Url.AbsolutePath == "/users")
        {
            HandlePostUser(request, response);
        }
        else
        {
            SendResponse(response, 404, "Not Found"); // Если запрос не найден
        }
    }

    private static void HandleGetUsers(HttpListenerResponse response)
    {
        using (AppDbContext db = new AppDbContext()) // Открываем базу данных
        {
            List<User> users = db.Users.ToList(); // Получаем всех пользователей
            string json = JsonSerializer.Serialize(users, new JsonSerializerOptions { WriteIndented = true });

            SendResponse(response, 200, json); // Отправляем список пользователей
        }
    }

    private static void HandlePostUser(HttpListenerRequest request, HttpListenerResponse response)
    {
        using (StreamReader reader = new StreamReader(request.InputStream, request.ContentEncoding))
        {
            string body = reader.ReadToEnd();
            User user = JsonSerializer.Deserialize<User>(body);

            if (user == null) // Если не удалось десериализовать, возвращаем ошибку
            {
                SendResponse(response, 400, "Invalid JSON");
                return;
            }

            using (AppDbContext db = new AppDbContext()) // Открываем базу данных
            {
                db.Users.Add(user);
                db.SaveChanges(); // Сохраняем пользователя в базе данных
            }

            DataHandler.SaveUser(user); // Сохраняем пользователя в JSON

            SendResponse(response, 201, "User added"); // Отправляем подтверждение
        }
    }

    private static void SendResponse(HttpListenerResponse response, int statusCode, string message)
    {
        response.StatusCode = statusCode; // Устанавливаем статус-код
        byte[] buffer = Encoding.UTF8.GetBytes(message); // Кодируем текст в байты
        response.OutputStream.Write(buffer, 0, buffer.Length); // Отправляем данные клиенту
        response.OutputStream.Close(); // Закрываем поток
    }
}
