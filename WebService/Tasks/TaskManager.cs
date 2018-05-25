using FluentScheduler;

namespace WebService.Tasks
{
    public class TaskManager: Registry
    {
        public TaskManager()
        {
            Schedule<CleanListenerTask>().ToRunNow().AndEvery(120).Seconds();
        }
    }
}
