using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.IO;
using System.Collections.Generic;

namespace Anatolij.Data;

public class AppDbContext : DbContext
{
    public DbSet<Anatolij.Models.User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        string json = File.ReadAllText("appsettings.json"); // Читаем файл конфигурации
        Dictionary<string, Dictionary<string, string>> config =
         JsonSerializer.Deserialize<Dictionary<string, Dictionary<string, string>>>(json);

        string connectionString = config["ConnectionStrings"]["PostgresConnection"];
        options.UseNpgsql(connectionString); // Подключаемся к базе данных
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Anatolij.Models.User>(entity =>
        {
            entity.ToTable("users");
            entity.HasKey(e => e.id);
            entity.Property(e => e.id).HasColumnName("id");
            entity.Property(e => e.name).HasColumnName("name");
            entity.Property(e => e.password).HasColumnName("password");
        });
    }
}
