

using Data;
using MaydenShopping.Server.Repository;
using Microsoft.AspNetCore.Mvc;
using Models.Common;
using Models.Food;
using NSubstitute;
using Service.Food;
using MockQueryable;


namespace UnitTests.services
{

    public class FoodServiceTests
    {

        private IRepository<FoodItem> repository;
        private FoodService target;

        [SetUp]
        public void InitService()
        {
            repository = Substitute.For<IRepository<FoodItem>>();
            target = new FoodService(repository);
        }

        [TearDown]
        public void Dispose()
        {
            repository.Dispose();
        }

        [Test]
        public async Task Should_return_list_of_items()
        {
            // Arrange
            var items = new List<FoodItem> { 
                new FoodItem{},
                new FoodItem{}
            };
            repository.Get().Returns(items.BuildMock().AsQueryable());
            var requestList = new RequestList
            {
                PageNumber = 1,
                Showing = 10
            };

            // Act
            var result = await target.GetItems(requestList);

            // Assert
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            var objectResult = (OkObjectResult)result;
            Assert.That(objectResult.StatusCode, Is.EqualTo(200));
            Assert.That(objectResult.Value, Is.InstanceOf<ResponseList<FoodResponse>>());
            var responseList = (ResponseList<FoodResponse>)objectResult.Value;
            Assert.That(responseList.Items.Count(), Is.EqualTo(2));
            Assert.That(responseList.TotalItems, Is.EqualTo(2));

        }
    }
}
