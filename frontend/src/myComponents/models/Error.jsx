import { RefreshCw, AlertCircle, Home } from 'lucide-react'
import Button from '@/components/ui/button'

const Error = ({ message, onRetry }) => {
    return (
        <div className="flex min-h-[60vh] items-center justify-center p-4">
            <div className="flex flex-col items-center gap-6 text-center max-w-md">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                    <AlertCircle className="h-10 w-10 text-destructive" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Unable to Load Doctors</h2>
                    <p className="mt-2 text-muted-foreground">
                        {message || 'Something went wrong while fetching doctors. Please try again.'}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                    <Button onClick={onRetry} className="gap-2" size="lg">
                        <RefreshCw className="h-4 w-4" />
                        Try Again
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = '/'} className="gap-2" size="lg">
                        <Home className="h-4 w-4" />
                        Go Home
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Error