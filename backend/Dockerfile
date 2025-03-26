# Сборка backend
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Копируем и устанавливаем зависимости
COPY backend.sln ./
COPY hw4.csproj ./
RUN dotnet restore backend.sln
RUN dotnet restore hw4.csproj

# Копируем код проекта
COPY . ./

# Сборка проекта
RUN dotnet publish backend.sln -c Release -o out

# Финальный контейнер
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

# Копируем собранный проект
COPY --from=build /app/out .

# Копируем конфиг (с учетом папки backend!)
COPY appsettings.json ./

CMD ["dotnet", "hw4.dll"]
