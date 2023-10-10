const curiosites = [
    "Fermat's Last Theorem: Pierre de Fermat demonstrated that 26 is the only integer sandwiched between a perfect square (25) and a perfect cube (27)",
    "Fermat's Last Theorem: It took over 350 years for mathematician Andrew Wiles to prove Fermat's Last Theorem, one of the most famous unsolved problems in mathematics",
    "Golden Ratio: Its approximately equal to 1.61803398875, appears in various aspects of art, architecture, and nature, including the Parthenon and the Fibonacci sequence",
    "Infinity and Infinity: There are different sizes of infinity in mathematics. For example, the set of real numbers is larger than the set of natural numbers, even though both sets are infinite",
    "Fibonacci Sequence in Nature: The Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, 13, ...) appears in many natural phenomena, such as the arrangement of leaves on a stem or the spiral patterns in sunflowers",
    "Time Zones: Dealing with time zones requires understanding how to add or subtract hours to coordinate activities across different regions",
    "Infinity Isn't a Number: Unlike other numbers, infinity (∞) isn't a specific value but a concept representing an unbounded quantity, making it a fascinating topic in mathematics",
    "Binary Code: Computers represent data using binary code (0s and 1s), which is based on the principles of Boolean algebra—a branch of mathematics",
    "Algorithms: Algorithms, fundamental to programming, are step-by-step procedures for solving problems. They often rely on mathematical logic and operations",
    "Complexity Analysis: Big O notation is a mathematical way to describe the efficiency and performance of algorithms, helping programmers make informed choices",
    "Geometry in Graphics: Graphics programming involves math concepts like vectors, matrices, and transformations to render 3D scenes on 2D screens",
    "Game Development: Physics engines in games rely on mathematical principles to simulate real-world physics, making game physics closely tied to math",
    "Data Structures: Concepts like arrays, linked lists, and trees are essential in programming, and they draw from mathematical concepts of sets and graphs"
]

const getRandomIndex = () => {
    if (curiosites.length === 0) {
       return null
    } else {
       return Math.floor(Math.random() * curiosites.length)
    }
}


/* On Botfather, type /setcommands
curiosity - Get a random curiosity about math
*/
module.exports = (bot) => {
    bot.hears('/curiosity', (ctx) => {
        let curiosity = curiosites[getRandomIndex()]
        ctx.reply(curiosity)
    });
    
    bot.help(async (ctx) => {
      const commands = await ctx.getMyCommands();
      const info = commands.reduce((acc, val) => `${acc}/${val.command} - ${val.description}\n`, '');
      return ctx.reply(info)
    })
}
