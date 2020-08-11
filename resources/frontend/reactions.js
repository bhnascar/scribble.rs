const ANIM_DURATION = 1500;
const NUM_REACTIONS = 5;
const BORDER_SIZE = 0.1;
const RATE_LIMIT = 20;

class ReactionSystem {
  constructor(board) {
    this.container = document.createElement('div');
    this.container.style.position = 'absolute';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    this.container.style.pointerEvents = 'none';
    this.container.style.overflow = 'hidden';
    board.appendChild(this.container);

    this.activeCounts = {};
  }

  react(text) {
    for (let i = 0; i < NUM_REACTIONS; i++) {
      if (this.activeCounts[text] >= RATE_LIMIT) {
        return;
      }

      const startTime = Math.random() * 300;
      setTimeout(() => {
        const containerRect = this.container.getBoundingClientRect();
        const borderSize = BORDER_SIZE * containerRect.width;
        const randX = Math.random();
        const randY = Math.random();

        let x, y;
        if (Math.random() < 0.5) {
          // Place horizontally
          x = randX * containerRect.width;
          y = (randY < 0.5)
            ? randY * borderSize
            : containerRect.height - (randY * borderSize);
        } else {
          // Place vertically
          x = (randX < 0.5)
            ? randX * borderSize
            : containerRect.width - (randX * borderSize);
          y = randY * containerRect.height;
        }
    
        const reaction = document.createElement('div');
        reaction.innerText = text;
        reaction.style.position = 'absolute';
        reaction.style.left = x + 'px';
        reaction.style.top = y + 'px';
        reaction.style.fontSize = '30px';
        this.container.appendChild(reaction);
    
        this.animateThenDestroy(text, reaction, ANIM_DURATION);
        this.activeCounts[text] = (this.activeCounts[text] || 0) + 1;
      }, startTime);
    }
  }

  animateThenDestroy(text, elem, duration) {
    const start = Date.now();
    const animationStep = () => {
      const elapsed = Date.now() - start;
      if (elapsed < duration) {
        const scale = this.scaleFunction(elapsed, duration);
        elem.style.transform = `scale(${scale}, ${scale})`
        window.requestAnimationFrame(animationStep);
      } else {
        elem.remove();
        this.activeCounts[text] -= 1;
      }
    }
    window.requestAnimationFrame(animationStep);
  }

  scaleFunction(elapsed, total) {
    let scaleDuration = 300;
    if (elapsed < scaleDuration) {
      return this.easeInOutQuad(elapsed, 0, 1, scaleDuration);
    } else if (elapsed >= scaleDuration && elapsed < total - scaleDuration) {
      return 1;
    } else {
      const remaining = total - elapsed;
      return this.easeInOutQuad(remaining, 0, 1, scaleDuration);
    }
  }

  // https://stackoverflow.com/questions/8316882/
  easeInOutQuad(t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t + b;
      return -c/2 * ((--t)*(t-2) - 1) + b;
  };
}