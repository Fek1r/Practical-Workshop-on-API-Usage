using System;
using System.Net;
using System.Text;
using Anatolij.Data;
using Anatolij.Http; // добавь это

namespace Anatolij;

public class Program
{
    public static void Main()
    {
        using (AppDbContext db = new AppDbContext()) // Подключаемся к базе
        {
            // db.Database.EnsureCreated(); // Создаем базу, если её нет
        }

        HttpListener listener = new HttpListener();
        listener.Prefixes.Add("http://localhost:8080/");
        listener.Start();
        Console.WriteLine("Сервер запущен на http://localhost:8080/");

        while (true)
        {
            HttpListenerContext context = listener.GetContext(); // Ждем входящий запрос

            // Добавляем CORS заголовки
            context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            context.Response.Headers.Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
            context.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type");

            // Обрабатываем OPTIONS запросы (для CORS)
            if (context.Request.HttpMethod == "OPTIONS")
            {
                context.Response.StatusCode = 200;
                context.Response.Close();
                continue;
            }

            HttpHandler.HandleRequest(context.Request, context.Response); // Передаем запрос в обработчик
        }
    }
}
