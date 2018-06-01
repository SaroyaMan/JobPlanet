using FluentScheduler;

namespace WebService.Tasks
{
    public class TaskManager: Registry
    {
        public TaskManager()
        {
            Schedule<CleanListenerTask>().ToRunNow().AndEvery(120).Seconds();
            //Schedule<CandidateRecommenderTask>().ToRunNow().AndEvery(12).Hours();
            //Schedule<CandidateRecommenderTask>().ToRunNow().AndEvery(1).Minutes();

        }
    }
}
