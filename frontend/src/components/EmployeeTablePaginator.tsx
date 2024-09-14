import { Button } from "../shadcn/ui/button"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "../shadcn/ui/pagination"


interface Props {
    pageCount: number,
    pageNumber: number
}

export default function EmployeeTablePaginator({ pageCount, pageNumber }: Props) {
    const pagesList = []
    for (var i = 1; i <= pageCount; i++)
        pagesList.push(i)

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious />
                </PaginationItem>
                {pagesList.map((i, idx) =>
                    <PaginationItem key={idx}>
                        <a href={`../page/${i}`}>
                            <Button size="icon" variant={pageNumber === i ? "default" : "secondary"}>
                                {i}
                            </Button>
                        </a>
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationNext />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
