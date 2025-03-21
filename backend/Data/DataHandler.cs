using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using Anatolij.Models;

namespace Anatolij.Data;

public static class DataHandler
{
    private static readonly string FilePath = "users.json";

    public static void SaveUser(Anatolij.Models.User user)
    {
        List<Anatolij.Models.User> users = LoadUsers(); // Загружаем текущих пользователей
        users.Add(user); // Добавляем нового пользователя

        string json = JsonSerializer.Serialize(users, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(FilePath, json); // Записываем в JSON-файл
    }

    public static List<Anatolij.Models.User> LoadUsers()
    {
        if (!File.Exists(FilePath)) // Если файла нет, создаем пустой список
        {
            return new List<Anatolij.Models.User>();
        }

        string json = File.ReadAllText(FilePath); // Читаем JSON-файл
        List<Anatolij.Models.User> users = JsonSerializer.Deserialize<List<Anatolij.Models.User>>(json);

        if (users == null) // Если десериализация не удалась, создаем пустой список
        {
            return new List<Anatolij.Models.User>();
        }

        return users; // Возвращаем список пользователей
    }
}
