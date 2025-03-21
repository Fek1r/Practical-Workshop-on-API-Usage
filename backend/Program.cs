using System;
using System.Net;
using Anatolij.Http;
using Anatolij.Data;

namespace Anatolij;

public class Program
{
    public static void Main()
    {
        using (AppDbContext db = new AppDbContext()) // Подключаемся к базе
        {
            db.Database.EnsureCreated(); // Создаем базу, если её нет
        }

        HttpListener listener = new HttpListener();
        listener.Prefixes.Add("http://localhost:8080/");
        listener.Start();
        Console.WriteLine("Сервер запущен на http://localhost:8080/");

        while (true)
        {
            HttpListenerContext context = listener.GetContext(); // Ждем входящий запрос
            HttpHandler.HandleRequest(context.Request, context.Response); // Передаем запрос в обработчик
        }
    }
}
