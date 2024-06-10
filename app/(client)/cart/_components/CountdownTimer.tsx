import { useState, useEffect } from 'react';
import { differenceInMinutes, differenceInHours, differenceInSeconds } from 'date-fns';

type CountdownTimerProps = {
    targetDate: string;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const now = new Date();
        const target = new Date(targetDate);
        const difference = target.getTime() - now.getTime();

        const hours = differenceInHours(target, now);
        const minutes = differenceInMinutes(target, now) % 60;
        const seconds = differenceInSeconds(target, now) % 60;

        return {
            hours: hours > 0 ? hours : 0,
            minutes: minutes > 0 ? minutes : 0,
            seconds: seconds > 0 ? seconds : 0,
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!mounted) {
        return <div>Loading...</div>;
    }

    return (
        <>{timeLeft.minutes < 60 ? `${timeLeft.minutes} : ${timeLeft.seconds}` : `${timeLeft.hours} : ${timeLeft.minutes} : ${timeLeft.seconds}`}</>
    );
};

export default CountdownTimer;
