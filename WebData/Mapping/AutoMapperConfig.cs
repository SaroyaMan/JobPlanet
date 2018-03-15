using AutoMapper;
using WebData.Data;
using WebData.Dtos;

namespace WebData.Mapping {
    public class AutoMapperConfig: Profile {

        public AutoMapperConfig() {

            CreateMap<Skill, SkillDto>();
            CreateMap<SkillDto, Skill>()
                .ForMember(s => s.CreatedBy, opt => opt.Ignore())
                .ForMember(s => s.LastUpdateBy, opt => opt.Ignore());
        }
    }
}