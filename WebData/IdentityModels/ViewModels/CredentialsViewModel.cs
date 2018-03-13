using FluentValidation.Attributes;
using WebData.IdentityModels.ViewModels.Validations;

namespace WebData.IdentityModels.ViewModels {

    [Validator(typeof(CredentialsViewModelValidator))]
    public class CredentialsViewModel {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
