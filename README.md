# ~~Shitty~~ Simple slider
## gh-pages
[example](https://gamabuntat.github.io/shitty-slider/)
## build
`nmp run build`
## tests
`npm test`
## linter
`npm run lint`

## default OPTIONS
```javascript
{
  step: 1,
  min: 0,
  max: 10,
  from: 0,
  to: 10,
  isInterval: false,
  isVertical: false,
  isLabel: true,
  isScale: true
}
```
## init
```javascript
$(sliderID).slider({}); \\ with default options
$(sliderID).slider({
  from: 3,
  max: 100,
  step: 3.333,
});
```
## API
```javascript
/* ------------------------------------------- */
$(sliderID).slider().destroy();
/* ------------------------------------------- */
const cb = (response) => console.log(response);
$(sliderID).slider().subscribe(cb); \\ subscribe to updates
$(sliderID).slider({ isScale: false });
// console.log:
//   {
//     id: sliderId,
//     ...options
//   }
// yes, the answer also contains a slider ID
```

## architecture
Плагин реализован по схеме MVP, с пассивным view.
Взаимодействие между слоями приложения реализовано с помощью класса EventEmitter. Presenter подписывается на события, которые вызывают Service и View.
(не смог перевести)

## UML
[uml](https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1#R7V1tb5s6FP41kbYPmTAkJP3YJt16pW6r1ml3%2B%2BgFN%2FEdwRE4bbNff4%2FBQMDQkcQu0WRp0uKDccHPeeM5Ngy82fr5Q4w3q48sIOHAdYLngTcfuK7rOBP4T0h2mQRNfSlZxjSQslJwT38TKXSkdEsDklQ6csZCTjdV4YJFEVnwigzHMXuqdntgYfWvbvCSKIL7BQ5V6b804KtMOnUnpfyG0OUq%2F8vIv8iOrHHeWd5JssIBe9oTedcDbxYzxrNf6%2BcZCcXs5fOSnfe%2B5WhxYTGJeJcT2PZm%2Fpk46%2Ffoy5wnm8%2Bffn76MJSjPOJwK2%2F4LiYJjEhiedV8l09F8kTXIY6gdfXAIn4vjyBo45AuI%2Fi9yM70rh5JzCnM4qU8wNkGpIsVDYNbvGNbccUJx4tfeetqxWL6G4bFoRwTDsdcKoTrV3rcizNB7IAULhf63OXTgGqij%2Fi50vEWJ1wKFiwM8SahP4vbWON4SaMrxjlby05yfuB2yHPrxKMCTjAEwtaExzvoIk%2FwfKkB0gYuZPOp1CeUd1nt6dJ0KtVYqvCyGLlEGX5IoA8A3VVAHwqkSfxIFyC4hMY%2F97IFM%2B96SMyE6PNIyZPs8E38rKsITBJPoYvZLzJjIQNdmEcs0xkahjVRrjYheeCtSpNs8IJGy9u0z3xUSr7IqRIiBuc%2BhKl5rWgQkEgAzjjmOENX3MCG0Yinczm%2Bgn8w4zPn3XgwhgufQRuVbfgnusd8xiK4F0xToAmozhMR6tNNK9oNTlUVqRpitruoxnhkSDU8RTUUjEOaYpdhnPtEdBTAa4AqJCWiXwXg8yFSUPdU1L0GhEP8k4R3LKGcMjF%2BnPWtId8XuNOudm8I20kHcEkA0U82YYpWbMkiHF6XUpjzbRSQQM542eeWpeAJ7P4jnO%2Bk58ZbzoTv5uvcr5MouBSBWYSLECcJXWTC91TcTjoqtOTpaFQAIi7tZQ8Md8K28YK8MAdjmUKAoycvIZlFcRXKmISY08fqhTQhlZ4K94l3ex2kHpYj3wlBGSnQRTVSDL1JDfVsxFIHiks7Xi3GilY0unYb%2FY%2BL%2FggdF%2F3RxJSP95vDfwiJdlyL9wsx4eDv6%2FLU0SY14SZmS5jm5ArH9UNJmlBXZSscgfNPbA5xcJgZa8khEDKlYBObRBhDF416ziKmDeBeZfeVkC8k2cCEkDdvrVlrB37aDfjc%2FrUjf6EgD3PwQJc2VTCUKnjjrrZuCvL8gmq5QizN3Br5wUbe8lxxYOw2ZuNIJQRt7NaF7tjtN3QjlfjLYjc8C9vIbQx2v6MXN2fUKvFT0Ls2dGsJ3f6RT%2FnmIveoxdYfKBElMMHh893GhvAjWF7vzGO4yujZGK4N3t6DuErfZYYNw69Y8EYY9Vtr3%2BYUoPdw7p9dHUfqSrWIk12TlqoNmjQjclg1Rim3DGtBG02c6hBZmUieVaJ2aFlH%2BTueU1MCA2UdpLKws4zND4gt8GhM%2FYa1op3rda3wOE67xp4WI1SSNqvmrOEZj0hltkHhoKDQ4oLOJulT2Vmb9GmDt%2B%2Bkz1V52IK5ET5UsDZFcbU4MmMsDiyho18duqaAI1MO3lVp2ruy%2Bm7Du87w7tbie%2F9Vmdy12%2FCuzeDblOBcwrtrF2YahLf38N5G1mZez4Zw%2FZD3zuK4Kkt7k66Is9Hb4MP5aNJ78G5efmmD9wmmrmdBpDlTtwsiDcLbe%2FBuWxG5BgOyoVs%2F4L2Hbr%2FDIqlXKcDAzXwf5FtmoPFDNAAe2Zw%2F7x%2Bc74pWUbgJKF6zKPi6otFgv36DGl1RuS3HHQ20FnhcyV7%2BeV9Os2aY3ZYzdF8u4Cgn%2BKd1lxu1jJaHXJUvvk93gNj00yR5dAbFIU%2Flkm0CemLAOvNVvZ5d1WsQ3r4TUE%2Blg7MElLPlMiTfJDofWVAvE2UdbgrnKrtY%2B9erIL2Xi%2FwmfrGPhPXVVgx5LWu4Tl4x1JIJ6l8yVN8LdFFJCrtfmdEs0lPLErfCWdsk0iCH2X8B0lP9iU0hTwshbQ7rbFJIu6jcILy9p5Bti8q3mwBz8k2IbWaoH%2FfeqUxPLU2kL7%2BzAdwkC9R%2FFdKzK4S1m%2FqZrxD27Aphg%2FD2HcFHKqtbrAMWLi%2BfORvF9WPfexQfddkR9ueqX%2FXVe2mNb5%2B9eab8%2B97vvWIjtMpao2jkpcaBPkanpfLXNOcnkjzupBqt67vCsktVKB5lnPp7X5HnvRtXh2phi3TRM6MuvJ8uvRg67xyvqhzTkf%2BieojGHYkp3KdIGstadaFn3avaGlUt3zv%2Fx2q0%2B2o6idwWDuhQpSzeQto2kGGV9DvwCH8XFe22aIl2KvqiG5KnU9HTi5pmGGCW%2FSZG4u%2FWEy1rWzrA99oW32H149%2BFZPZw%2FQpI%2Bq%2BMpPoEef0Is3O9ptx%2BMGCgjS%2BqJ47Drm8OLxRE%2FytdmxYNzdzBpSOMRiiBfZHv4c%2BVbW8ZPxfKaGLXDRmEt2%2FKaOI2oCsoo4wlqrysm4CLt9SRfh3oSh3VczZ9SnB2eXbrRyEkz1ByTj%2F2jrQQDMY%2BJNH2kqgTc7xxvtG3%2BALEkc%2F5ykD11EDT06Ff%2F2QFeoVlR9Mmz9WD0h6lkfmmjXcj8A17FFfBd7Vu24CWypZ12sthbudG140bhh6JXKeqfsoayq72Uv%2F0iltff6%2FJXtB0XPk7%2BdP4kfYCzfILcln38kN83vX%2F)
