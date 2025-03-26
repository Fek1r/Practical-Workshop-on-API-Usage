FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY backend.sln ./
COPY hw4.csproj ./

RUN dotnet restore backend.sln
RUN dotnet restore hw4.csproj

COPY . ./
RUN dotnet publish backend.sln -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

COPY --from=build /app/out .
COPY appsettings.json ./

CMD ["dotnet", "hw4.dll"]
