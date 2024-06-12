import mongoose from 'mongoose';

const Customer = mongoose.model('Customer');

const buildQuery = (rules, condition) => {
    const query = { $and: [] };

    rules.forEach(rule => {
        const { field, operator, value } = rule;
        let fieldCondition = {};

        switch (operator) {
            case '>':
                fieldCondition[field] = { $gt: parseFloat(value) }; 
                break;
            case '>=':
                fieldCondition[field] = { $gte: parseFloat(value) };
                break;
            case '<':
                fieldCondition[field] = { $lt: parseFloat(value) };
                break;
            case '<=':
                fieldCondition[field] = { $lte: parseFloat(value) };
                break;
            case '=':
                fieldCondition[field] = field === 'last_visit_date' ? new Date(value) : parseFloat(value);
                break;
            case '!=':
                fieldCondition[field] = { $ne: parseFloat(value) };
                break;
            default:
                break;
        }

        query.$and.push(fieldCondition);
    });

    if (condition === 'OR') {
        query.$or = query.$and;
        delete query.$and;
    }

    return query;
};
let temporaryAudienceList = [];
const checkAudienceController = async (req, res) => {
    try {
        const { rules, condition } = req.body;
        const query = buildQuery(rules, condition);


        const customersMatching = await Customer.aggregate([
            {
                $lookup: {
                    from: 'orders',
                    localField: '_id',
                    foreignField: 'customer',
                    as: 'orders'
                }
            },
            {
                $addFields: {
                    total_spends: { $sum: '$orders.amount' },
                    number_of_visits: { $size: '$orders' },
                    last_visit_date: { $max: '$orders.date' }
                }
            },
            { $match: query }
        ]);

        temporaryAudienceList = customersMatching;

        res.send({ size: customersMatching.length, audienceList: customersMatching });
    } catch (error) {
        console.error("Error: ", error); 
        res.status(500).send({ error: error.message });
    }
};

export { checkAudienceController,temporaryAudienceList};
