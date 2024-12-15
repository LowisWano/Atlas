import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

function Showcase() {
    return (
        <div className="flex border border-red-500">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">Item Showcase</CardTitle>
                            </CardHeader>
                            <CardContent>
                                Card
                            </CardContent>
                        </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                        {}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}