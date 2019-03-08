const tokenMocks = [
  'eyJhbGciOiJIUzI1NiIsInR5cCI6.IkpXVCJ9LuM0Y6QTMq8qz6jrUNU',
  'eyJ1c2VySWQiOjYsInVzZXJuYW1lIjoia.GFYXRhciI6bnVsbCwiaWF0I',
  'joxNTE4MjE3NDgxLCJleHAiOjE1MTgzMD.M4ODF95bpjPulGXnJ4WiZBjWslkii',
];

const imageMocks = [
  'http://res.cloudinary.com/abdulfatai/image/upload/v1518036371/iobfo9dic5foht2omzu4.png',
];

const authUserBasicA = {
  userId: 1,
  username: 'abdulfatai',
  avatar: null,
};

const authUserMockA = {
  signinRes: {
    message: 'Signin was successful',
    user: {
      ...authUserBasicA,
    },
    token: tokenMocks[1],
  },
  signupRes: {
    message: 'Signup was successful',
    user: {
      ...authUserBasicA,
      name: 'Aka Abdulfatai',
      email: null,
    },
    token: tokenMocks[1],
  },
  authPayload: {
    ...authUserBasicA,
    token: tokenMocks[1],
  },
};

const authUserMock = {
  avatar: null,
  token: tokenMocks[0],
  userId: 6,
  username: 'hamdeed',
};

const newUserMock = {
  name: 'Abdulfatai Aka',
  username: 'abdulfatai',
  email: null,
  assword: 'password',
};

const recipeMock = {
  id: 10,
  userId: 1,
  procedure: 'This is a simple procedure for this recipe',
  title: 'A new recipe for testing',
  ingredients: 'First, Second,Third',
  upvotes: 0,
  noviews: 0,
  downvotes: 0,
  image: null,
  createdAt: '2018-02-07T20:46:11.731Z',
  updatedAt: '2018-02-07T20:46:11.731Z',
  Owner: {
    username: 'abdulfatai',
    name: 'Abdulfatai',
    email: null,
    avatar: null,
    updatedAt: '2018-02-02T17:06:47.353Z',
  },
};

const reviewMock = {
  comment: 'Hello there',
  User: {
    id: 1,
    avatar: null,
    username: 'abdulfatai',
    createdAt: '2018-02-08T04:16:04.841Z',
  },
};

const catalogMock = {
  recipes: null,
  pagination: null,
  recipesStatus: null,
  isSearch: false,
};

const authMock = {
  user: null,
  authError: null,
  loggedIn: false,
};

const popularMock = [
  { ...recipeMock },
  { ...recipeMock, id: 44 },
  { ...recipeMock, id: 42 },
  { ...recipeMock, id: 47 },
];

const categoryMock = {
  id: 4,
  userId: 1,
  name: 'Bully',
};

const favoriteMock = {
  id: 13,
  userId: 1,
  recipeId: 10,
  categoryId: null,
  Recipe: {
    id: 10,
    userId: 1,
    procedure: 'This is a simple procedure for this recipe',
    title: 'A new recipe for testing',
    ingredients: 'First, Second,Third',
    upvotes: 0,
    noviews: 0,
    downvotes: 0,
    image: imageMocks[0],
    Owner: {
      username: 'abdulfatai',
      name: 'Abdulfatai',
      avatar: null,
      email: null,
    },
  },
};

const viewRecipeMock = {
  ...recipeMock,
  Reviews: [
    { ...reviewMock },
    { ...reviewMock },
  ],
};

const sessionUserA = `{
  "userId":1,
  "username":"abdulfatai",
  "token":"eyJ1c2VySWQiOjYsInVzZXJuYW1lIjoia.GFYXRhciI6bnVsbCwiaWF0I",
  "avatar":null
}`;

const sessionUserMocks = [
  sessionUserA,
];

const getAddCategoryResMock = () => ({
  message: 'Category added successfully',
  category: {
    id: 5,
    userId: 1,
    name: 'Bully2',
    updatedAt: '2018-02-10T19:45:22.293Z',
    createdAt: '2018-02-10T19:45:22.293Z',
  },
});

const getAddCategResMock = () => ({
  message: 'Category added successfully',
  category: {
    id: 5,
    userId: 1,
    name: 'Bully2',
    updatedAt: '2018-02-10T19:45:22.293Z',
    createdAt: '2018-02-10T19:45:22.293Z',
  },
});

const getPostReviewMock = () => ({
  message: 'Review posted successfully',
  review: {
    comment: 'Hello there',
    User: {
      id: 1,
      avatar: null,
      username: 'abdulfatai',
      createdAt: '2018-02-11T04:25:20.669Z',
    },
  },
});

const catalogUserBasics = {
  pagination: {
    page: 1,
    totalCount: 1,
    pageCount: 1,
    pageSize: 1,
    pageLimit: 2,
  },
  recipes: [
    {
      id: 10,
      userId: 1,
      procedure: 'This is a simple procedure for this recipe',
      title: 'A new recipe for testing',
      ingredients: 'First, Second,Third',
      upvotes: 0,
      noviews: 0,
      downvotes: 0,
      image: null,
      createdAt: '2018-02-07T20:46:11.731Z',
      updatedAt: '2018-02-07T20:46:11.731Z',
      Owner: {
        username: 'abdulfatai',
        name: 'Abdulfatai',
        avatar: null,
        email: null,
      },
    },
  ],
};

const getCatalogRecipesResMock = userId => ({
  message: 'Recipes fetched successfully',
  ...catalogUserBasics,
});

const getUserRecipesResMock = userId => ({
  message: 'User recipes fetched successfully',
  ...catalogUserBasics,
});

const getUserResMock = (userId) => {
  if (userId === 1) {
    return ({
      message: 'User details fetched successfully',
      user: {
        id: 1,
        username: 'abdulfatai',
        name: 'Abdulfatai',
        email: null,
        gender: 'male',
        avatar: null,
        createdAt: '2018-01-28T09:56:42.913Z',
        updatedAt: '2018-02-10T10:47:14.069Z',
      },
    });
  }
  return null;
};

const updatePersonalResMock = (id, name, email, gender) => ({
  message: 'User details updated successfully',
  user: {
    id,
    name,
    email,
    gender,
  },
});

const getMock = (which) => {
  switch (which) {
    case 'newuser':
      return newUserMock;
    case 'sessionUsers':
      return sessionUserMocks;
    case 'authUserA':
      return authUserMockA;
    case 'authuser':
      return authUserMock;
    case 'recipe':
      return viewRecipeMock;
    case 'catalog':
      return catalogMock;
    case 'review':
      return reviewMock;
    case 'auth':
      return authMock;
    case 'favorite':
      return favoriteMock;
    case 'category':
      return categoryMock;
    case 'popular':
      return popularMock;
    default:
      return null;
  }
};

export default {
  getMock,
  updatePersonalResMock,
  getUserResMock,
  getAddCategoryResMock,
  getAddCategResMock,
  getPostReviewMock,
  getCatalogRecipesResMock,
  getUserRecipesResMock,
};
