function shower(x, y) {
      Math.Radian = Math.PI * 2;

      var sparkCount = 80,
          sparkSpeed = 4,
          sparkSize = 3,
          sparkSizeDecay = 0.96,
          sparkGravity = 1.02,
          angle, distance,
          firstSpark = null,
          lastSpark, spark,

          colors = ['rgba(255,255,255,1)','rgba(255,255,170,1)','rgba(0,191,255,1)','rgba(0,255,0,1)','rgba(255,99,71,1)'],
          colorCount = colors.length,

          canvas = document.getElementById("hanabi"),
          context, canvasWidth, canvasHeight;

      canvasWidth = canvas.width = window.innerWidth;
      canvasHeight = canvas.height = window.innerHeight;
      context = canvas.getContext("2d");

      for (let i = 0; i < sparkCount; i++) {
          angle = Math.random() * Math.Radian;
          distance = Math.random() * sparkSpeed + sparkSpeed;
          spark = new Spark(x, y);

          spark.vx = Math.cos(angle) * distance;
          spark.vy = Math.sin(angle) * distance;
          spark.size = sparkSize;

          if (firstSpark === null) {
              firstSpark = lastSpark = spark;
          } else {
              lastSpark.next = spark;
              lastSpark = spark;
          }
      }

      function animationLoop() {
          let currentSpark = firstSpark;
          context.fillStyle = "rgba(0,0,0,0.2)";
          context.fillRect(0,0,canvasWidth,canvasHeight);

          do {
              if (currentSpark.size < 0.2) continue;

              context.lineWidth = currentSpark.size;
              context.strokeStyle = colors[Math.floor(Math.random() * colorCount)];
              context.beginPath();
              context.moveTo(currentSpark.x, currentSpark.y);

              currentSpark.x += currentSpark.vx;
              currentSpark.y = (currentSpark.y * sparkGravity + currentSpark.vy);

              context.lineTo(currentSpark.x, currentSpark.y);
              context.stroke();

              currentSpark.size *= sparkSizeDecay;
          } while(currentSpark = currentSpark.next);

          requestAnimationFrame(animationLoop);
      }

      animationLoop();
    }

    function Spark(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.size = 0;
        this.next = null;
    }

    // ========================
    // 2) GIFS ALEATÓRIOS
    // ========================
    const gifList = [
      ".images/meme1.gif",
      "images/meme2.gif",
      "images/meme3.gif",
      "images/meme4.gif",
      "images/meme5.gif",
      "images/meme6.gif",
    ];

    function spawnGif() {
      const gif = document.createElement("img");
      gif.src = gifList[Math.floor(Math.random() * gifList.length)];
      gif.className = "random-gif";
      gif.style.top = Math.random() * (window.innerHeight - 200) + "px";
      document.body.appendChild(gif);

      gif.addEventListener("animationend", () => gif.remove());
    }

    // ========================
    // 3) CLIQUE PARA INICIAR
    // ========================
    document.body.addEventListener("click", () => {
        document.getElementById("happyBirthdayText").classList.add("visible");

        // 🎆 loop de fogos
        setInterval(() => {
            let x = Math.random() * window.innerWidth;
            let y = Math.random() * (window.innerHeight / 2);
            shower(x, y);
        }, 1500);

        // 🎭 loop dos gifs
        setInterval(spawnGif, 4000);

    }, { once: true });