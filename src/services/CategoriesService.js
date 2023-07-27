
class CategoriesService {
    static getCategories(req, res) {
        return res.status(200).json([
            {
                'id': 1,
                'category': 'carpinteiro'
            },
            {
                'id': 2,
                'category': 'jardineiro'
            },
            {
                'id': 3,
                'category': 'encanador'
            },
            {
                'id': 4,
                'category': 'eletricista'
            }
    ]);
    }
}

module.exports = CategoriesService;
