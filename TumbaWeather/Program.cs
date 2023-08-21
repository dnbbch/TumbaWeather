namespace TumbaWeather
{
    public class Program
    {
        
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddTransient<IRequestApi, RequestApiServices>();
            
            var app = builder.Build();

            app.UseStaticFiles();

            app.UseMiddleware<ProcessingQueryStringMiddleware>();

            app.Run();
        }
    }
}