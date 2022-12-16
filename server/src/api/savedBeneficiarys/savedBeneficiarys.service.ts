import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateSavedBeneficiaryDto } from './dto/create-saved-beneficiary.dto';
import { UpdateSavedBeneficiaryDto } from './dto/update-saved-beneficiary.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SavedBeneficiary} from "./entities/savedBeneficiary.entity";
import {Account} from "../accounts/entities/account.entity";

@Injectable()
export class SavedBeneficiarysService {
  constructor(
      @InjectRepository(SavedBeneficiary)
      private savedBeneficiaryRepository: Repository<SavedBeneficiary>,
      @InjectRepository(Account)
      private accountRepository: Repository<Account>
  ) {}
  async create(createSavedBeneficiaryDto: CreateSavedBeneficiaryDto) {
      try {
          const infoAccount = await this.accountRepository.createQueryBuilder('account')
              .leftJoinAndSelect("account.user","user")
              .where( 'account.account_number= :account_number',{account_number: createSavedBeneficiaryDto.beneficiaryAccountNumber})
              .getOne();

          if (infoAccount == null){
              throw new BadRequestException();
          }

          if (!createSavedBeneficiaryDto.beneficiaryNickname) {
              createSavedBeneficiaryDto.beneficiaryNickname = infoAccount.user.name || "Ẩn Danh";
          }

          const beneficiary: SavedBeneficiary = await this.savedBeneficiaryRepository.save({...createSavedBeneficiaryDto, customerId: infoAccount.customerId});

          return{
              statusCode: 201,
              message: "Lưu người thụ hưởng thành công",
              data: beneficiary
          }
      } catch (e) {
          return{
              statusCode: 400,
              message: "Lỗi trong lưu người thụ hưởng",
              error: e.error
          }
      }
  }

  findAll() {
    return this.savedBeneficiaryRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} savedBeneficiary`;
  }

  async update(id: number, updateSavedBeneficiaryDto: UpdateSavedBeneficiaryDto) {
        try {
            if (updateSavedBeneficiaryDto.beneficiaryAccountNumber) {

                const infoAccount = await this.accountRepository.createQueryBuilder('account')
                    .leftJoinAndSelect("account.user","user")
                    .where( 'account.account_number= :account_number',{account_number: updateSavedBeneficiaryDto.beneficiaryAccountNumber})
                    .getOne();

                if (infoAccount == null){
                    throw new BadRequestException();
                }

                if (!updateSavedBeneficiaryDto.beneficiaryNickname) {
                    updateSavedBeneficiaryDto.beneficiaryNickname = infoAccount.user.name || "Ẩn Danh";
                }

                await this.savedBeneficiaryRepository.update(id,updateSavedBeneficiaryDto);
                return{
                    statusCode: 200,
                    message: "Cập nhật người thụ hưởng thành công",
                }
            } else {
                const beneficiary = await this.savedBeneficiaryRepository.findOneBy({id:id})

                if (beneficiary == null) {
                    throw new BadRequestException();
                }

                const nickName = (!updateSavedBeneficiaryDto.beneficiaryNickname) ? beneficiary.beneficiaryNickname : updateSavedBeneficiaryDto.beneficiaryNickname
                const defaultName = (!updateSavedBeneficiaryDto.beneficiaryDefaultName) ? beneficiary.beneficiaryDefaultName : updateSavedBeneficiaryDto.beneficiaryDefaultName

                beneficiary.beneficiaryNickname = nickName;
                beneficiary.beneficiaryDefaultName = defaultName;

                await this.savedBeneficiaryRepository.save(beneficiary);

                return{
                    statusCode: 200,
                    message: "Cập nhật người thụ hưởng thành công",
                }
            }
        }catch (e) {
            return{
                statusCode: 400,
                message: "Lỗi trong cập nhật người thụ hưởng",
                error: e.error
            }
        }
  }

  async remove(id: number) {
      try {
          const result = await this.savedBeneficiaryRepository.findOneBy({id: id})

          if (result == null) {
              throw new BadRequestException();
          }
          await this.savedBeneficiaryRepository.remove(result);

          return {
              statusCode: 200,
              message: `Xoá thành công #${result.beneficiaryNickname} khỏi danh sách thụ hưởng`,
          }
      }
       catch (e) {
           return{
               statusCode: 400,
               message: "Lỗi trong xoá người thụ hưởng",
               error: e.error
           }
      }
  }


}
