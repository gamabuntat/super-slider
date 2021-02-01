function foo(a: number) {
    const b = a + 10;
    console.log(a);
    return b;
}

let a = 10;
a = 11;

foo(a + 10);
