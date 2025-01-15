interface Book {
    id: string,
    title: string, 
    author: string 
    genre: string
    rating: number, 
    totalCopies:number, 
    availableCopies: number, 
    description:string, 
    coverColor:string, 
    coverUrl:string,
    summary:string,
    isLoanedBook?: boolean,
    createdAt: Date | null,
}

interface AuthCredentials {
    fullname: string,
    password: string,
    email: string,
    universityId: number,
    universityCard: string
}


interface BookParams {
    title: string,
    author: string,
    genre: string,
    rating: number,
    coverUrl: string,
    coverColor: string,
    description: string,
    totalCopies: number,
    videoUrl: string,
    summary: string
}

interface BorrowBookParams {
    bookId: string;
    userId: string;
  }