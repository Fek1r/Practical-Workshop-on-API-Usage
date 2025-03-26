using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using Anatolij.Models;

namespace Anatolij.Data;

public static class DataHandler
{
    private static readonly string FilePath = "Database/users.json";

    public static void SaveAllUsersFromDb()
    {
        using (AppDbContext db = new AppDbContext()) // Открываем соединение с базой
        {
            List<User> users = db.Users.ToList(); // Загружаем всех пользователей
            string json = JsonSerializer.Serialize(users, new JsonSerializerOptions { WriteIndented = true });

            // Проверяем существование папки
            string directory = Path.GetDirectoryName(FilePath);
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }

            File.WriteAllText(FilePath, json); // Перезаписываем JSON-файл всеми пользователями
        }
    }
}
