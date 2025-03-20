using System;
using System.Net;

namespace DockerHw4
{
    class Program
    {
        static void Main(string[] args)
        {
           System.Net.HttpListener listener = new System.Net.HttpListener();
           listener.Prefixes.Add("http://localhost:8080/");
           listener.Start();
           Console.WriteLine("Starting host on http://localhost:8080/");
           while (true)
           {
               HttpListenerContext context = listener.GetContext();
               Console.WriteLine("Got request");
               context.Response.StatusCode = 200;
               context.Response.ContentType = "text/html";
               context.Response.OutputStream.Write(System.Text.Encoding.UTF8.GetBytes("<h1>Hello World</h1>"));
               context.Response.OutputStream.Close();
               Console.WriteLine("Sent response");  
           }
        }
    }
}