using FluentValidation;

namespace WebData.IdentityModels.ViewModels.Validations {
    public class RecruiterRegistrationViewModelValidator: AbstractValidator<RecruiterRegistrationViewModel> {

        public RecruiterRegistrationViewModelValidator() {
            RuleFor(vm => vm.Email).NotEmpty().WithMessage("Email cannot be empty");
            RuleFor(vm => vm.Password).NotEmpty().WithMessage("Password cannot be empty");
            RuleFor(vm => vm.FirstName).NotEmpty().WithMessage("FirstName cannot be empty");
            RuleFor(vm => vm.LastName).NotEmpty().WithMessage("LastName cannot be empty");
        }
    }
}
