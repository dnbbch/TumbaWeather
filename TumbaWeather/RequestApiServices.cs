using System.Net.Http;

namespace TumbaWeather
{
    public class RequestApiServices : IRequestApi
    {
        public async Task<object?> GetWeatherInfo(IQueryCollection query)
        {
            HttpClient httpClient = new HttpClient();

            ResultResponse? APIresponse = null;

            string? lon = query["lon"];
            string? lat = query["lat"];
            string? city_name = query["city_name"];

            if(city_name != null)
            {
                Result[]? result = await httpClient.GetFromJsonAsync<Result[]>($"http://api.openweathermap.org/geo/1.0/direct?q={city_name}&appid=759b9e123c724bde9a7c3b099c357219");
                APIresponse = await httpClient.GetFromJsonAsync<ResultResponse?>($"https://api.openweathermap.org/data/2.5/forecast?lat={result?[0]?.lat}&lon={result?[0]?.lon}&appid=759b9e123c724bde9a7c3b099c357219&lang=ru&units=metric");
            }

            else if(lon != null && lat != null)
            {
                APIresponse = await httpClient.GetFromJsonAsync<ResultResponse?>($"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=759b9e123c724bde9a7c3b099c357219&lang=ru&units=metric");
            }
            
            if(APIresponse?.cod == "200")
            {
                return APIresponse;
            }

            else
            {
                return "Не работает";
            }
        }
    }
}
