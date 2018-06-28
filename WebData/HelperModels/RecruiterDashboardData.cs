using System.Collections.Generic;
using WebData.Dtos;

namespace WebData.HelperModels
{
    public class RecruiterDashboardData
    {
        public IEnumerable<PositionDto> OpenPositions { get; set; }
        public int NumOfOpenPositions { get; set; }
    }
}
