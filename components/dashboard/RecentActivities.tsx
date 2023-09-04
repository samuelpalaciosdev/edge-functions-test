import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

export default function RecentActivities() {
  return (
    <Card className='col-span-4 lg:col-span-3'>
      <CardHeader>
        <CardTitle className='text-2xl font-semibold'>
          Recent activities
        </CardTitle>
        <CardDescription>You have played a total of 10 quizzes</CardDescription>
      </CardHeader>
      <CardContent className='max-h[580px] overflow-scroll'>
        Histories
      </CardContent>
    </Card>
  );
}
