namespace UnitTests
{
    public static class TestingExtensions
    {

        public static string Repeat(this string value, int amount)
        {
            var buffer = value;
            for (int i = 1; i < amount; i++)
            {
                buffer += value;
            }
            return buffer;
        }
    }
}
