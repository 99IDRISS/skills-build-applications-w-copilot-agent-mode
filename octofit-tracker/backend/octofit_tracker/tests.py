from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class BasicModelTest(TestCase):
    def setUp(self):
        team = Team.objects.create(name='Marvel', description='Team Marvel')
        user = User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=team)
        Activity.objects.create(user=user, type='run', distance=5, duration=30)
        Workout.objects.create(user=user, workout='Pushups', reps=50)
        Leaderboard.objects.create(user=user, points=100)

    def test_user(self):
        self.assertEqual(User.objects.count(), 1)

    def test_team(self):
        self.assertEqual(Team.objects.count(), 1)

    def test_activity(self):
        self.assertEqual(Activity.objects.count(), 1)

    def test_workout(self):
        self.assertEqual(Workout.objects.count(), 1)

    def test_leaderboard(self):
        self.assertEqual(Leaderboard.objects.count(), 1)
