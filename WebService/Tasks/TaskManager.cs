using FluentScheduler;
using WebData.ConstValues;

namespace WebService.Tasks
{
    public class TaskManager: Registry
    {
        public TaskManager()
        {
            Schedule<CleanListenerTask>().ToRunNow().AndEvery(Consts.MINUTES_TO_RUN_CLEANER_TASK).Minutes();
            Schedule<CandidateRecommenderTask>().ToRunNow().AndEvery(Consts.HOURS_TO_RUN_RECOMMENDER_TASK).Hours();
        }
    }
}