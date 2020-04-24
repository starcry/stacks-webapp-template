using Shouldly;
using xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium;
using xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Selenium.Components;

namespace xxAMIDOxx.xxSTACKSxx.E2E.Selenium.Tests.Steps
{
  public class CreateMenu
  {
    private readonly SeleniumWrapper user;

    public CreateMenu(SeleniumWrapper seleniumWrapper)
    {
      user = seleniumWrapper;
    }

    #region Step Definitions

    #region Given
    public void ARestaurantWithMenus()
    {
      var menuListComponent = new MenuList(user.Instance());

      menuListComponent.Displayed(menuListComponent.menuList).ShouldBeTrue();
    }
    #endregion Given

    #region When
    public void ICreateANewMenu()
    {
      var header = new Header(user.Instance());
      var createMenu = new CreateForm(user.Instance());

      header.Click(header.createMenu);
      createMenu.Displayed(createMenu.name).ShouldBeTrue();

      createMenu.TypeText(createMenu.name, "Selenium Menu");
      createMenu.TypeText(createMenu.description, "Generated by .NET Selenium Framework");
      createMenu.Select(createMenu.active);
      createMenu.Click(createMenu.save);
    }
    #endregion When

    #region Then
    public void TheResturantShouldHaveANewMenu()
    {
      var snackbar = new Notifier(user.Instance());

      snackbar.Text(snackbar.message).ShouldContain("menu created");
    }
    #endregion Then

    #endregion Step Definitions
  }
}