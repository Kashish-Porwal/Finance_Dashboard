"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRecordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_record_dto_1 = require("./create-record.dto");
class UpdateRecordDto extends (0, swagger_1.PartialType)(create_record_dto_1.CreateRecordDto) {
}
exports.UpdateRecordDto = UpdateRecordDto;
//# sourceMappingURL=update-record.dto.js.map