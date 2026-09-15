

using Data;
using MaydenShopping.Server.Repository;
using MaydenShopping.Server.Services.Food;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MockQueryable;
using Models.Common;
using Models.Food;
using NSubstitute;


namespace UnitTests.services
{

    public class FoodServiceTests
    {

        private IRepository<FoodItem> repository;
        private IRepository<ShoppingListItem> shoppingListRepository;
        private ILogger<FoodService> logger;
        private FoodService target;

        [SetUp]
        public void InitService()
        {
            repository = Substitute.For<IRepository<FoodItem>>();
            shoppingListRepository = Substitute.For<IRepository<ShoppingListItem>>();
            logger = Substitute.For<ILogger<FoodService>>();
            target = new FoodService(repository, shoppingListRepository, logger);
        }

        [TearDown]
        public void Dispose()
        {
            repository.Dispose();
            shoppingListRepository.Dispose();
        }

        [Test]
        public async Task Should_return_list_of_items()
        {
            // Arrange
            List<FoodItem> items = new()
            {
                new FoodItem{},
                new FoodItem{}
            };
            repository.Get().Returns(items.BuildMock().AsQueryable());
            RequestList requestList = new()
            {
                PageNumber = 1,
                Showing = 10
            };

            // Act
            var result = await target.GetItems(requestList);

            // Assert
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            OkObjectResult objectResult = (OkObjectResult)result;
            Assert.That(objectResult.StatusCode, Is.EqualTo(200));
            Assert.That(objectResult.Value, Is.InstanceOf<ResponseList<FoodResponse>>());
            ResponseList<FoodResponse>? responseList = (ResponseList<FoodResponse>)objectResult.Value;
            Assert.That(responseList.Items.Count(), Is.EqualTo(2));
            Assert.That(responseList.TotalItems, Is.EqualTo(2));
        }

        [Test]
        public async Task Should_insert_item()
        {
            // Arrange
            FoodRequest item = new()
            {
                Barcode = "012345678912",
                Name = "Test",
                Price = 2.0
            };

            repository.Get().Returns(new List<FoodItem>().BuildMock().AsQueryable());

            // Act
            var result = await target.InsertItem(item);

            // Assert
            await repository.Received().Insert(Arg.Any<FoodItem>(), Arg.Any<CancellationToken>());
            await repository.Received().Save(Arg.Any<CancellationToken>());
            Assert.That(result, Is.InstanceOf<OkResult>());
            OkResult objectResult = (OkResult)result;
            Assert.That(objectResult.StatusCode, Is.EqualTo(200));
        }

        [Test]
        public async Task Should_fail_validation_on_barcode_not_a_number()
        {
            // Arrange
            FoodRequest item = new()
            {
                Barcode = "not a number",
                Name = "Test",
                Price = 2.0
            };

            // Act
            var result = await target.InsertItem(item);

            // Assert
            await repository.Received(0).Insert(Arg.Any<FoodItem>(), Arg.Any<CancellationToken>());
            await repository.Received(0).Save(Arg.Any<CancellationToken>());
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
            BadRequestObjectResult objectResult = (BadRequestObjectResult)result;
            Assert.That(objectResult.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task Should_fail_validation_on_barcode_too_long()
        {
            // Arrange
            FoodRequest item = new()
            {
                Barcode = "12345678901234567890",
                Name = "Test",
                Price = 2.0
            };

            // Act
            var result = await target.InsertItem(item);

            // Assert
            await repository.Received(0).Insert(Arg.Any<FoodItem>(), Arg.Any<CancellationToken>());
            await repository.Received(0).Save(Arg.Any<CancellationToken>());
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
            BadRequestObjectResult objectResult = (BadRequestObjectResult)result;
            Assert.That(objectResult.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task Should_fail_validation_on_barcode_too_short()
        {
            // Arrange
            FoodRequest item = new()
            {
                Barcode = "1",
                Name = "Test",
                Price = 2.0
            };

            // Act
            var result = await target.InsertItem(item);

            // Assert
            await repository.Received(0).Insert(Arg.Any<FoodItem>(), Arg.Any<CancellationToken>());
            await repository.Received(0).Save(Arg.Any<CancellationToken>());
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
            BadRequestObjectResult objectResult = (BadRequestObjectResult)result;
            Assert.That(objectResult.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task Should_fail_validation_on_barcode_empty()
        {
            // Arrange
            FoodRequest item = new()
            {
                Barcode = "",
                Name = "Test",
                Price = 2.0
            };

            // Act
            var result = await target.InsertItem(item);

            // Assert
            await repository.Received(0).Insert(Arg.Any<FoodItem>(), Arg.Any<CancellationToken>());
            await repository.Received(0).Save(Arg.Any<CancellationToken>());
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
            BadRequestObjectResult objectResult = (BadRequestObjectResult)result;
            Assert.That(objectResult.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task Should_fail_validation_on_name_empty()
        {
            // Arrange
            FoodRequest item = new()
            {
                Barcode = "012345678912",
                Name = "",
                Price = 2.0
            };

            // Act
            var result = await target.InsertItem(item);

            // Assert
            await repository.Received(0).Insert(Arg.Any<FoodItem>(), Arg.Any<CancellationToken>());
            await repository.Received(0).Save(Arg.Any<CancellationToken>());
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
            BadRequestObjectResult objectResult = (BadRequestObjectResult)result;
            Assert.That(objectResult.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task Should_fail_validation_on_name_too_long()
        {
            // Arrange
            FoodRequest item = new()
            {
                Barcode = "012345678912",
                Name = "t".Repeat(2001),
                Price = 2.0
            };

            // Act
            var result = await target.InsertItem(item);

            // Assert
            await repository.Received(0).Insert(Arg.Any<FoodItem>(), Arg.Any<CancellationToken>());
            await repository.Received(0).Save(Arg.Any<CancellationToken>());
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
            BadRequestObjectResult objectResult = (BadRequestObjectResult)result;
            Assert.That(objectResult.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task Should_fail_validation_on_price_too_low()
        {
            // Arrange
            FoodRequest item = new()
            {
                Barcode = "012345678912",
                Name = "",
                Price = -2.0
            };

            // Act
            var result = await target.InsertItem(item);

            // Assert
            await repository.Received(0).Insert(Arg.Any<FoodItem>(), Arg.Any<CancellationToken>());
            await repository.Received(0).Save(Arg.Any<CancellationToken>());
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
            BadRequestObjectResult objectResult = (BadRequestObjectResult)result;
            Assert.That(objectResult.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task Should_delete_item()
        {
            // Arrange
            FoodItem itemToDelete = new()
            {
                Id = 1
            };

            repository.DeleteAsync(1, Arg.Any<CancellationToken>()).Returns(true);
            shoppingListRepository.Get().Returns(new List<ShoppingListItem>().BuildMock().AsQueryable());

            // Act
            await target.DeleteItem(1);

            // Assert
            await repository.Received(1).DeleteAsync(1, Arg.Any<CancellationToken>());
            await repository.Received(1).Save(Arg.Any<CancellationToken>());
        }

        [Test]
        public async Task Should_fail_delete_when_no_item_to_delete()
        {
            // Arrange

            repository.DeleteAsync(1, Arg.Any<CancellationToken>()).Returns(false);

            // Act
            await target.DeleteItem(1);

            // Assert
            await repository.Received(1).DeleteAsync(1, Arg.Any<CancellationToken>());
            await repository.Received(0).Save(Arg.Any<CancellationToken>());
        }
    }
}
