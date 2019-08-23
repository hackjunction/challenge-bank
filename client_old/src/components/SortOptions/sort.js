import _ from 'lodash';

const Options = [
    {
        key: 'default',
        name: 'Default',
        sort: challenges => challenges
    },
    {
        key: 'a-z',
        name: 'Name, A-Z',
        sort: challenges => _.sortBy(challenges, 'name')
    },
    {
        key: 'z-a',
        name: 'Name, Z-A',
        sort: challenges => _.reverse(_.sortBy(challenges, 'name'))
    },
    {
        key: 'difficulty-asc',
        name: 'Easiest first',
        sort: challenges => _.sortBy(challenges, c => c.challengeDifficulty.difficultyvalue)
    },
    {
        key: 'difficulty-desc',
        name: 'Hardest first',
        sort: challenges => _.sortBy(challenges, c => -1 * c.challengeDifficulty.difficultyvalue)
    },
    {
        key: 'category-asc',
        name: 'Category, A-Z',
        sort: challenges => _.sortBy(challenges, c => c.challengeCategory.name)
    },
    {
        key: 'category-desc',
        name: 'Category Z-A',
        sort: challenges => _.reverse(_.sortBy(challenges, c => c.challengeCategory.name))
    }
];

const Default = Options[0];

export default {
    Options,
    Default
};
