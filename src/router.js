import Vue from 'vue'
import Router from 'vue-router'
import Quizzes from './views/Quizzes.vue'
import Quiz from './views/Quiz.vue'
import Questions from './views/Questions.vue'
import Attempts from './views/Attempts.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import CreateQuiz from './views/CreateQuiz.vue'
import CreateQuestions from './views/CreateQuestions.vue'
import UpdateQuiz from './views/UpdateQuiz.vue'
import DisplayResult from './views/DisplayResult.vue'
import AdminUsers from './views/AdminUsers.vue'
import UpdateUser from './views/UpdateUser.vue'
import {api} from './api'
import QuizLeaderBoard from './views/QuizLeaderBoard.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Quizzes,
            meta: { requiresAuth: true }
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/quizzes',
            component: Quizzes,
            meta: { requiresAuth: true }
        },
        {
            path: '/quizzes/quiz/:id',
            component: Quiz,
            meta: { requiresAuth: true }
        },
        {
            path: '/create-quiz',
            component: CreateQuiz,
            meta: { requiresAuth: true }
        },
        {
            path: '/create-questions/:quizId',
            component: CreateQuestions,
            meta: { requiresAuth: true }
        },
        {
            path: '/questions/:id',
            component: Questions,
            meta: { requiresAuth: true }
        },
        {
            path: '/attempts',
            component: Attempts,
            meta: { requiresAuth: true }
        },
        {
            path: '/leaderboard/:id',
            component: QuizLeaderBoard,
            meta: { requiresAuth: true }
        },
        {
            path: '/result/:id',
            component: DisplayResult,
            meta: { requiresAuth: true }
        },
        {
            path: '/update-quiz/:id',
            component: UpdateQuiz,
            meta: { requiresAuth: true },
            beforeEnter: async (to, from, next) => {
                try {
                    const quizId = to.params.id;
                    const quiz = await api.get_quiz_by_id(quizId);
                    const userId = localStorage.getItem('userId');
                    const user = await api.get_user_by_id(userId);
                    if (quiz.created_by === userId) {
                        next();
                    } else if (user.role === 'admin'){
                        next();
                    } else {
                        next('/quizzes'); // Redirect to quizzes page if not authorized
                    }
                } catch (error) {
                    next('/quizzes'); // Redirect to quizzes page if an error occurs
                }
            }
        },
        {
            path: '/admin/users',
            component: AdminUsers,
            meta: { requiresAuth: true},
            beforeEnter: async (to, from, next) => {
                try {
                    const userId = localStorage.getItem('userId');
                    const user = await api.get_user_by_id(userId);
                    if (user.role === 'admin') {
                        next();
                    } else {
                        next('/quizzes'); // Redirect to quizzes page if not authorized
                    }
                } catch (error) {
                    next('/quizzes'); // Redirect to quizzes page if an error occurs
                }
            }
        },
        {
            path: '/update-user/:id',
            component: UpdateUser,
            meta: { requiresAuth: true},
            beforeEnter: async (to, from, next) => {
                try {
                    const userId = localStorage.getItem('userId');
                    const user = await api.get_user_by_id(userId);
                    if (user.role === 'admin') {
                        next();
                    } else if (userId === to.params.id) {
                        next();
                    } else {
                        next('/quizzes'); // Redirect to quizzes page if not authorized
                    }
                } catch (error) {
                    next('/quizzes'); // Redirect to quizzes page if an error occurs
                }
            }
        }
        
        
    ]
})

// navigation guard
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const token = localStorage.getItem('token');

    if (requiresAuth && !token) {
        next('/login');
    } else {
        next();
    }
});

export default router;
