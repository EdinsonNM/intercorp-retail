export default class CustomerAnalysis {
    static getAnalysis(ages = []) {
        const results = {
            averageAge: 0,
            standardDeviation: 0
        };
        if (ages && ages.length >= 2) {
            const averageAge =
                ages.reduce((previus, current) => previus + current, 0) /
                ages.length;

            const rawSum = ages.reduce(
                (previus, current) =>
                    previus + Math.pow(current - averageAge, 2),
                0
            );

            const standardDeviation = Math.sqrt(rawSum / (ages.length - 1));
            results.standardDeviation = standardDeviation.toFixed(2);
            results.averageAge = averageAge;
        }
        return results;
    }
}
