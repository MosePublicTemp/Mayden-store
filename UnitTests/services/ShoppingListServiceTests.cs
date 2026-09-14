

using Data;
using MaydenShopping.Server.Repository;
using Microsoft.AspNetCore.Mvc;
using Models.Common;
using Models.Food;
using NSubstitute;
using Service.Food;
using MockQueryable;
using MaydenShopping.Server.Services.ShoppingList;
using Microsoft.Extensions.Logging;


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
            var items = new List<ShoppingListItem> { 
                new ShoppingListItem{},
                new ShoppingListItem{}
            };
            repository.Get().Returns(items.BuildMock().AsQueryable());

            // Act
            var result = await target.GetShoppingList(CancellationToken.None);

            // Assert
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            var objectResult = (OkObjectResult)result;
            Assert.That(objectResult.StatusCode, Is.EqualTo(200));
            Assert.That(objectResult.Value, Is.InstanceOf<IEnumerable<ShoppingListItem>>());
            var responseList = ((IEnumerable<ShoppingListItem>)objectResult.Value).ToList();
            Assert.That(responseList.Count(), Is.EqualTo(2));

        }
    }
}
