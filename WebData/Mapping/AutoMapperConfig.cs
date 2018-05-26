using AutoMapper;
using System.Text;
using WebData.Data;
using WebData.Dtos;

namespace WebData.Mapping
{
    public class AutoMapperConfig: Profile
    {

        public AutoMapperConfig()
        {
            //CreateMap<Source, Destination>

            CreateMap<Skill, SkillDto>();
            CreateMap<SkillDto, Skill>()
                .ForMember(s => s.CreatedBy, opt => opt.Ignore())
                .ForMember(s => s.LastUpdateBy, opt => opt.Ignore())
                .ForMember(s => s.SkillCategory, opt => opt.Ignore());

            CreateMap<SkillCategory, SkillCategoryDto>()
                .ForMember(s => s.Skills, opt => opt.Condition(s => s.Skills != null));

            CreateMap<SkillCategoryDto, SkillCategory>()
                .ForMember(s => s.Skills, opt => opt.Condition(s => s.Skills != null));

            CreateMap<Question, QuestionDto>()
                .ForMember(q => q.Skills, opt => opt.Ignore())
                .ForMember(q => q.MatchingDistance, opt => opt.Ignore())
                .ForMember(q => q.QuestionState, opt => opt.Ignore());

            CreateMap<QuestionDto, Question>()
                .ForMember(q => q.RankSum, opt => opt.Ignore())
                .ForMember(q => q.CreatedBy, opt => opt.Ignore())
                .ForMember(q => q.LastUpdateBy, opt => opt.Ignore())
                .ForMember(q => q.MatchingVector, opt => opt.Ignore())
                .ForMember(q => q.CandidateQuestions, opt => opt.Ignore())
                .ForMember(q => q.DateCreated, opt => opt.Condition(q => q.DateCreated != null))
                .ForMember(q => q.LastUpdateDate, opt => opt.Condition(q => q.LastUpdateDate != null));

            CreateMap<Attachment, AttachmentDto>();
            CreateMap<AttachmentDto, Attachment>();

            CreateMap<CandidateQuestion, CandidateQuestionDto>();
            CreateMap<CandidateQuestionDto, CandidateQuestion>();

            CreateMap<Test, TestDto>()
                .ForMember(t => t.Questions, opt => opt.Ignore());
            CreateMap<TestDto, Test>()
                .ForMember(t => t.CreatedBy, opt => opt.Ignore())
                .ForMember(t => t.LastUpdateBy, opt => opt.Ignore())
                .ForMember(t => t.DateCreated, opt => opt.Condition(t => t.DateCreated != null))
                .ForMember(t => t.LastUpdateDate, opt => opt.Condition(t => t.LastUpdateDate != null));

            CreateMap<TestSolution, TestSolutionDto>();
            CreateMap<TestSolutionDto, TestSolution>();

            CreateMap<TestSolutionQuestion, TestSolutionQuestionDto>();
            CreateMap<TestSolutionQuestionDto, TestSolutionQuestion>();

            CreateMap<QuestionTest, QuestionTestDto>();
            CreateMap<QuestionTestDto, QuestionTest>();

            CreateMap<Position, PositionDto>()
                .ForMember(p => p.Skills, opt => opt.Ignore());
            CreateMap<PositionDto, Position>()
                .ForMember(p => p.DateCreated, opt => opt.Condition(p => p.DateCreated != null))
                .ForMember(p => p.LastUpdateDate, opt => opt.Condition(p => p.LastUpdateDate != null))
                .ForMember(p => p.CreatedBy, opt => opt.Ignore())
                .ForMember(p => p.LastUpdateBy, opt => opt.Ignore());

            CreateMap<CandidatePosition, CandidatePositionDto>();
            CreateMap<CandidatePositionDto, CandidatePosition>()
                .ForMember(cp => cp.Id, opt => opt.Ignore());
        }
    }
}