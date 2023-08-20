namespace TumbaWeather
{
    public interface IRequestApi
    {
        public Task<object?> GetWeatherInfo(IQueryCollection query);
    }
}
