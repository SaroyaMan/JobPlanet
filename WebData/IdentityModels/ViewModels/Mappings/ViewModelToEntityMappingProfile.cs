using AutoMapper;
using WebData.IdentityModels;
using WebData.IdentityModels.ViewModels;

namespace WebData.Mapping {
    public class ViewModelToEntityMappingProfile: Profile {

        public ViewModelToEntityMappingProfile() {
            CreateMap<RegistrationViewModel, AppUser>()
                .ForMember(au => au.UserName, map => map.MapFrom(vm => vm.Email));
        }
    }
}