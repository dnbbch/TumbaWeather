using System.Text;

namespace TumbaWeather
{
    public class ProcessingQueryStringMiddleware
    {
        private RequestDelegate _next;

        public ProcessingQueryStringMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, IRequestApi requestApi)
        {
            HttpRequest request = context.Request;
            HttpResponse response = context.Response;
            PathString path = request.Path;
            
            if(path == "/get_weather" && request.Query != null && request.Method == "GET") 
            {
                context.Response.ContentType = "text/html; charset-utf-8";
                StringBuilder sb = new StringBuilder();
                
                await response.WriteAsJsonAsync(requestApi.GetWeatherInfo(request.Query));
            }

            else
            {
                context.Response.ContentType = "text/html; charset-utf-8";
                await context.Response.SendFileAsync("..\\TumbaWeather\\wwwroot\\index.html");

            }

        }
    }
}
