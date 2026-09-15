

using Data;
using MaydenShopping.Server.Repository;
using MaydenShopping.Server.Services.ShoppingList;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MockQueryable;
using Models.ShoppingList;
using NSubstitute;


namespace UnitTests.services
{

    public class ShoppingListServiceTests
    {

        private IRepository<ShoppingListItem> repository;
        private IRepository<FoodItem> foodItemRepository;
        private ILogger<ShoppingListService> logger;
        private ShoppingListService target;

        [SetUp]
        public void InitService()
        {
            repository = Substitute.For<IRepository<ShoppingListItem>>();
            foodItemRepository = Substitute.For<IRepository<FoodItem>>();
            logger = Substitute.For<ILogger<ShoppingListService>>();
            target = new ShoppingListService(repository, foodItemRepository, logger);
        }

        [TearDown]
        public void Dispose()
        {
            repository.Dispose();
            foodItemRepository.Dispose();
        }

        [Test]
        public async Task Should_return_list_of_items()
        {
            // Arrange
            List<ShoppingListItem> items = new()
            {
                new ShoppingListItem{
                FoodItem = new FoodItem
                {
                    Name = "Food1",
                    Price = 5
                },
                FoodItemId = 0,
                Id = 1,
                IsInTrolly = false,
                SortIndex = 1
                },
                new ShoppingListItem{
                                FoodItem = new FoodItem
                {
                    Name = "Food2",
                    Price = 6
                },
                FoodItemId = 1,
                Id = 2,
                IsInTrolly = false,
                SortIndex = 0
                }
            };
            repository.Get().Returns(items.BuildMock().AsQueryable());

            // Act
            IActionResult result = await target.GetShoppingList(CancellationToken.None);

            // Assert
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            OkObjectResult objectResult = (OkObjectResult)result;
            Assert.That(objectResult.StatusCode, Is.EqualTo(200));
            Assert.That(objectResult.Value, Is.InstanceOf<IEnumerable<ShoppingListItemResponse>>());
            List<ShoppingListItemResponse> responseList = ((IEnumerable<ShoppingListItemResponse>)objectResult.Value).ToList();
            Assert.That(responseList.Count(), Is.EqualTo(2));
            Assert.That(responseList[0].Id, Is.EqualTo(2));
            Assert.That(responseList[1].Id, Is.EqualTo(1));
        }

        [Test]
        public async Task Should_reOrder_shopping_list()
        {
            // Arrange
            List<ShoppingListItem> items = new()
            {
                new ShoppingListItem{
                FoodItem = new FoodItem
                {
                    Name = "Food1",
                    Price = 5
                },
                FoodItemId = 0,
                Id = 1,
                IsInTrolly = false,
                SortIndex = 1
                },
                new ShoppingListItem{
                                FoodItem = new FoodItem
                {
                    Name = "Food2",
                    Price = 6
                },
                FoodItemId = 1,
                Id = 2,
                IsInTrolly = false,
                SortIndex = 0
                }
            };
            repository.Get().Returns(items.BuildMock().AsQueryable());
            repository.GetById(1, Arg.Any<CancellationToken>()).Returns(items[0]);

            // Act
            IActionResult result = await target.ReorderFoodItem(1, 0, CancellationToken.None);

            // Assert
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            OkObjectResult objectResult = (OkObjectResult)result;
            Assert.That(objectResult.StatusCode, Is.EqualTo(200));
            Assert.That(objectResult.Value, Is.InstanceOf<IEnumerable<ShoppingListItemResponse>>());
            List<ShoppingListItemResponse> responseList = ((IEnumerable<ShoppingListItemResponse>)objectResult.Value).ToList();
            Assert.That(responseList.Count(), Is.EqualTo(2));
            Assert.That(responseList[0].Id, Is.EqualTo(1));
            Assert.That(responseList[1].Id, Is.EqualTo(2));
        }

        [Test]
        public async Task Should_Insert_Item()
        {
            // Arrange
            FoodItem foodItem = new()
            {

            };
            foodItemRepository.GetById(1, Arg.Any<CancellationToken>()).Returns(foodItem);
            repository.Get().Returns(new List<ShoppingListItem>().BuildMock().AsQueryable());

            // Act
            IActionResult result = await target.InsertFoodItem(1, CancellationToken.None);

            // Assert
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            OkObjectResult objectResult = (OkObjectResult)result;
            Assert.That(objectResult.StatusCode, Is.EqualTo(200));
        }

        [Test]
        public async Task Should_Fail_Insert_When_Id_Is_Used()
        {
            // Arrange
            FoodItem foodItem = new()
            {

            };
            foodItemRepository.GetById(1, Arg.Any<CancellationToken>()).Returns(foodItem);
            repository.Get().Returns(new List<ShoppingListItem> { new() {
            FoodItem = foodItem,
            FoodItemId = 1
            } }.BuildMock().AsQueryable());

            // Act
            IActionResult result = await target.InsertFoodItem(1, CancellationToken.None);

            // Assert
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task Should_Delete_Item()
        {
            // Arrange
            repository.DeleteAsync(1, Arg.Any<CancellationToken>()).Returns(true);

            // Act
            IActionResult result = await target.DeleteFoodItem(1, CancellationToken.None);

            // Assert
            await repository.Received(1).DeleteAsync(1, Arg.Any<CancellationToken>());
            await repository.Received(1).Save(Arg.Any<CancellationToken>());
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }

        [Test]
        public async Task Should_Delete_Fail_to_delete_item_if_not_present()
        {
            // Arrange
            repository.DeleteAsync(1, Arg.Any<CancellationToken>()).Returns(false);

            // Act
            IActionResult result = await target.DeleteFoodItem(1, CancellationToken.None);

            // Assert
            await repository.Received(1).DeleteAsync(1, Arg.Any<CancellationToken>());
            await repository.Received(0).Save(Arg.Any<CancellationToken>());
            Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
        }
    }
}
