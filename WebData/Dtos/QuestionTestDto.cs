namespace WebData.Dtos
{
    public class QuestionTestDto
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public int TestId { get; set; }

        public QuestionDto Question { get; set; }
        public TestDto Test { get; set; }
    }
}
