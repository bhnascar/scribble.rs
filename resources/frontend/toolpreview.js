const TOOL_IMG_SIZE = 50;

const ToolOffsets = [
  { // Pen
    x: 0,
    y: -TOOL_IMG_SIZE,
  },
  { // Eraser
    x: -0.33 * TOOL_IMG_SIZE,
    y: -1 * TOOL_IMG_SIZE,
  },
  { // Bucket
    x: -0.03 * TOOL_IMG_SIZE,
    y: -0.49 * TOOL_IMG_SIZE,
  }
];

class ToolPreview {
  constructor(board) {
    this.tool = document.createElement('img');
    this.tool.style.width = TOOL_IMG_SIZE + 'px';
    this.tool.style.height = TOOL_IMG_SIZE + 'px';
    this.tool.style.position = 'absolute';
    this.tool.style.pointerEvents = 'none';
    this.tool.src = "/resources/pencil.png";

    this.preview = document.createElement('div');
    this.preview.style.width = '50px';
    this.preview.style.height = '50px';
    this.preview.style.position = 'absolute';
    this.preview.style.borderRadius = '25px';
    this.preview.style.backgroundColor = '#000000';
    this.preview.style.opacity = '0.5';
    this.preview.style.pointerEvents = 'none';

    this.width = 50;
    this.board = board;
    this.board.appendChild(this.preview);
    this.board.appendChild(this.tool);

    this.position = { x: 0, y: 0 };
    this.toolID = 0;

    board.addEventListener('mouseenter', (mouseEvent) => {
      this.tool.style.display = 'block';
      this.preview.style.display = 'block';
      this.setPosition(mouseEvent.clientX, mouseEvent.clientY);
    });

    board.addEventListener('mouseleave', (_mouseEvent) => {
      this.tool.style.display = 'none';
      this.preview.style.display = 'none';
    });

    board.addEventListener('mousemove', (mouseEvent) => {
      this.setPosition(mouseEvent.clientX, mouseEvent.clientY);
    });

    this.updateLoop();
  }

  updateLoop() {
    requestAnimationFrame(() => {
      const toolOffset = ToolOffsets[this.toolID];
      this.tool.style.left = (this.position.x + toolOffset.x) + 'px';
      this.tool.style.top = (this.position.y + toolOffset.y) + 'px';
      this.preview.style.left = (this.position.x - this.width / 2) + 'px';
      this.preview.style.top = (this.position.y - this.width / 2) + 'px';
      this.updateLoop();
    });
  }

  setPosition(mouseX, mouseY) {
    const boardRect = this.board.getBoundingClientRect();
    this.position.x = (mouseX - boardRect.left);
    this.position.y = (mouseY - boardRect.top);
  }

  setColor(color) {
    this.preview.style.backgroundColor = color;
  }

  setWidth(width) {
    this.width = width;
    this.preview.style.width = width + 'px';
    this.preview.style.height = width + 'px';
  }

  setTool(toolID) {
    if (toolID === 0) { // pen
      this.tool.src = "/resources/pencil.png";
    } else if (toolID === 1) { // eraser
      this.tool.src = "/resources/eraser.png";
      this.preview.style.backgroundColor = 'white';
    } else if (toolID === 2) { // bucket
      this.tool.src = "/resources/bucket.png";
    }
    this.toolID = toolID;
  }
}