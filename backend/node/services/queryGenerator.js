const validateQuery = (queryParts) => {
    const forbiddenPatterns = [
        /password/i,
        /credentials/i,
        /secret/i
    ];

    if (forbiddenPatterns.some(re => re.test(queryParts.join(" ")))) {
        throw new Error("Query contains potentially sensitive patterns");
    }
};

const generateQuery = (queryParts) => {
    validateQuery(queryParts);
    return queryParts.join(" ");
};

module.exports = { generateQuery };