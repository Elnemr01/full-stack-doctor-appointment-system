import { Calendar, Clock, User, Stethoscope } from 'lucide-react';
import { Link } from 'react-router';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';

const AppointmentCard = ({ appointment, onDelete }) => {
    const { _id, doctorId, reason, date, createdAt } = appointment;
    const { _id: doctorIdStr, name, speciality, image, yearsOfExperience } = doctorId || {};

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    const isUpcoming = new Date(date) > new Date();

    return (
        <article className="flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex gap-4 p-5">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img
                        src={image || 'https://via.placeholder.com/80'}
                        alt={name || 'Doctor'}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <Link 
                                to={`/doctors/${doctorIdStr}`}
                                className="font-bold text-lg text-foreground hover:text-primary transition-colors"
                            >
                                Dr. {name || 'Unknown Doctor'}
                            </Link>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <Stethoscope className="h-4 w-4" />
                                <span className="capitalize">{speciality || 'General'}</span>
                                <span className="flex h-1 w-1 rounded-full bg-muted-foreground/30" />
                                <span>{yearsOfExperience || 0}+ years exp</span>
                            </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                isUpcoming 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                                {isUpcoming ? 'Upcoming' : 'Completed'}
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(date)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span>{formatTime(date)}</span>
                        </div>
                        {isUpcoming && (
                            <div className="flex items-center gap-1.5 text-primary">
                                <Clock className="h-4 w-4" />
                                <span>in {formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-foreground">{reason || 'No reason provided'}</p>
                    </div>
                </div>
            </div>

            <div className="border-t px-5 py-3 bg-muted/30 flex items-center justify-end gap-2">
                <Link to={`/doctors/${doctorIdStr}`}>
                    <Button variant="ghost" size="sm">
                        <User className="h-3.5 w-3.5 mr-1.5" />
                        View Profile
                    </Button>
                </Link>
                {onDelete && isUpcoming && (
                    <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => onDelete(_id)}
                        className="gap-1.5"
                    >
                        <Calendar className="h-3.5 w-3.5" />
                        Cancel
                    </Button>
                )}
            </div>
        </article>
    );
};

export default AppointmentCard;