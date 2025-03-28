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
        response.ContentType = "application/json"; 

        if (request.HttpMethod == "GET" && request.Url.AbsolutePath == "/")
        {
            response.ContentType = "text/html"; 
            SendResponse(response, 200, "<h1>Hello World!</h1>");
        }
        else if (request.HttpMethod == "GET" && request.Url.AbsolutePath == "/users")
        {
            HandleGetUsers(response);
        }
        else if (request.HttpMethod == "POST" && request.Url.AbsolutePath == "/users")
        {
            HandlePostUser(request, response);
        }
        else
        {
            SendResponse(response, 404, "No Endpoint");
        }
    }

    private static void HandleGetUsers(HttpListenerResponse response)
    {
        using (AppDbContext db = new AppDbContext())
        {
            List<User> users = db.Users.ToList(); 

            string json = JsonSerializer.Serialize(users, new JsonSerializerOptions { WriteIndented = true });
            SendResponse(response, 200, json); 
        }
    }

    private static void HandlePostUser(HttpListenerRequest request, HttpListenerResponse response)
    {
        using (StreamReader reader = new StreamReader(request.InputStream, request.ContentEncoding))
        {
            string body = reader.ReadToEnd();
            User user = JsonSerializer.Deserialize<User>(body);

            if (user == null) 
            {
                SendResponse(response, 400, "Invalid JSON");
                return;
            }

            using (AppDbContext db = new AppDbContext()) 
            {
                db.Users.Add(user);
                db.SaveChanges(); 
            }

            // DataHandler.SaveAllUsersFromDb(); // user.json update

            SendResponse(response, 201, "User added and users.json updated"); 
        }
    }

    private static void SendResponse(HttpListenerResponse response, int statusCode, string message)
    {
        response.StatusCode = statusCode;
        byte[] buffer = Encoding.UTF8.GetBytes(message); // Кодируем текст в байты
        response.OutputStream.Write(buffer, 0, buffer.Length); // Отправляем данные клиенту
        response.OutputStream.Close();
    }
}