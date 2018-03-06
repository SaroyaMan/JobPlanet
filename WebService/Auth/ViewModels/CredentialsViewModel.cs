using FluentValidation.Attributes;
using WebService.Auth.Validations;

namespace WebData.ViewModels {

    [Validator(typeof(CredentialsViewModelValidator))]
    public class CredentialsViewModel {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
