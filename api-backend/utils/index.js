// const { AbilityBuilder, Ability } = require('@casl/ability');

function getToken(req) {
    let token = req.headers.authorization ? req.headers.authorization.replace("Bearer ", "") : null;

    if (token && token.length) {
        return token
    } else {
        return null
    }

    // return token && token.length ? token : null;
    
};

// const policies = {
//     guest: (user, {can}) => {
//         can('read', 'Products');
//     },
//     user: (user, {can}) => {
//         can('view', 'Order');
//         can('create', 'Order');
//         can('read', 'Order', {user_id: user._id});
//         can('update', 'User', {user_id: user._id});
//         can('read', 'Cart', {user_id: user._id});
//         can('update', 'Cart', {user_id: user._id});
//         can('view', 'DeliveryAddress');
//         can('create', 'DeliveryAddress', {user_id: user._id});
//         can('update', 'DeliveryAddress', {user_id: user._id});
//         can('delete', 'DeliveryAddress', {user_id: user._id});
//         can('read', 'Invoice', {user_id: user._id});
//     },
//     admin: (user, {can}) => {
//         can('manage', 'all');
//     },
// };

// const policyFor = (user) => {
//     const builder = new AbilityBuilder();

//     if (user && typeof policies[user.role] === 'function') {
//         policies[user.role](user, builder);
//     } else {
//         policies['guest'](user, builder);
//     }
//     return new Ability(builder.rules)
// };
// console.log(policyFor());

module.exports = { 
    // policyFor,
    getToken,
 };

